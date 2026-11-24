import { app } from './firebase-config.js';
import {
  getAuth,
  getIdTokenResult,
  signInWithEmailAndPassword,
  signOut,
  multiFactor,
  TotpMultiFactorGenerator,
  getMultiFactorResolver,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const ADMIN_EMAIL = 'admin@architect.bg';
const MFA_ISSUER = 'Academy Architect Studio';
const auth = getAuth(app);
const loginForm = document.getElementById('adminLoginForm');
const challengeForm = document.getElementById('adminMfaChallenge');
const enrollmentForm = document.getElementById('adminMfaEnrollForm');
const status = document.getElementById('adminAuthStatus');
const loginButton = loginForm.querySelector('button[type="submit"]');
let resolver = null;
let totpHint = null;
let enrollmentSecret = null;
let enrollmentUser = null;

function setStatus(message, kind = 'status') {
  status.textContent = message;
  status.dataset.kind = kind;
}

function resetMfaPanels() {
  loginForm.hidden = false;
  challengeForm.hidden = true;
  document.getElementById('adminMfaEnrollment').hidden = true;
}

function hasTotpFactor(user) {
  return multiFactor(user).enrolledFactors.some((factor) => factor.factorId === 'totp');
}

async function hasTotpSignInClaim(user) {
  const tokenResult = await getIdTokenResult(user, true);
  return tokenResult.claims.firebase?.sign_in_second_factor === 'totp';
}

async function beginTotpEnrollment(user) {
  enrollmentUser = user;
  const session = await multiFactor(user).getSession();
  enrollmentSecret = await TotpMultiFactorGenerator.generateSecret(session);
  document.getElementById('totpAccountLabel').textContent = ADMIN_EMAIL;
  document.getElementById('totpSecretKey').textContent = enrollmentSecret.secretKey;
  loginForm.hidden = true;
  document.getElementById('adminMfaEnrollment').hidden = false;
  setStatus('Първо добави authenticator фактор; след запис ще влезеш отново с код.', 'status');
}

async function completeVerifiedSignIn(user) {
  if (user.email?.toLowerCase() !== ADMIN_EMAIL || !await hasTotpSignInClaim(user)) {
    await signOut(auth);
    throw new Error('Firebase не потвърди администраторски вход с TOTP. Провери MFA настройките на проекта.');
  }

  window.location.assign('admin.html');
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  resetMfaPanels();
  resolver = null;
  totpHint = null;

  const email = document.getElementById('adminEmail').value.trim().toLowerCase();
  const password = document.getElementById('adminPass').value;
  if (email !== ADMIN_EMAIL) {
    setStatus('Невалиден администраторски вход.', 'error');
    return;
  }

  loginButton.disabled = true;
  setStatus('Проверявам данните за вход…');

  try {
    const credential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
    document.getElementById('adminPass').value = '';
    if (hasTotpFactor(credential.user)) {
      await completeVerifiedSignIn(credential.user);
    } else {
      await beginTotpEnrollment(credential.user);
    }
  } catch (error) {
    if (error.code === 'auth/multi-factor-auth-required') {
      try {
        resolver = getMultiFactorResolver(auth, error);
        totpHint = resolver.hints.find((hint) => hint.factorId === 'totp');
        document.getElementById('adminPass').value = '';
        if (!totpHint) {
          throw new Error('Няма регистриран TOTP фактор за този администраторски акаунт.');
        }
        loginForm.hidden = true;
        challengeForm.hidden = false;
        setStatus('Въведи кода от authenticator приложението.', 'status');
        document.getElementById('adminTotpCode').focus();
      } catch (resolverError) {
        setStatus(resolverError.message || 'Неуспешна MFA проверка.', 'error');
      }
    } else if (error.code === 'auth/operation-not-allowed') {
      await signOut(auth).catch(() => {});
      setStatus('Firebase Authentication / TOTP не е активиран за проекта. Админът остава защитен и няма достъп.', 'error');
    } else {
      await signOut(auth).catch(() => {});
      setStatus(error.message?.startsWith('Firebase не потвърди') ? error.message : 'Входът не бе потвърден. Провери Firebase Auth акаунта и опитай отново.', 'error');
    }
  } finally {
    loginButton.disabled = false;
  }
});

challengeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const code = document.getElementById('adminTotpCode').value.trim();
  if (!resolver || !totpHint || !/^\d{6}$/.test(code)) {
    setStatus('Въведи валиден 6-цифрен код.', 'error');
    return;
  }

  const submitButton = challengeForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  try {
    const assertion = TotpMultiFactorGenerator.assertionForSignIn(totpHint.uid, code);
    const credential = await resolver.resolveSignIn(assertion);
    await completeVerifiedSignIn(credential.user);
  } catch (error) {
    setStatus(error.message?.startsWith('Firebase не потвърди') ? error.message : 'Кодът е невалиден или изтекъл. Провери authenticator приложението и опитай отново.', 'error');
  } finally {
    document.getElementById('adminTotpCode').value = '';
    submitButton.disabled = false;
  }
});

enrollmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const code = document.getElementById('adminEnrollCode').value.trim();
  if (!enrollmentSecret || !enrollmentUser || !/^\d{6}$/.test(code)) {
    setStatus('Въведи валиден 6-цифрен код.', 'error');
    return;
  }

  const submitButton = enrollmentForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  try {
    const assertion = TotpMultiFactorGenerator.assertionForEnrollment(enrollmentSecret, code);
    await multiFactor(enrollmentUser).enroll(assertion, MFA_ISSUER);
    await signOut(auth);
    enrollmentSecret = null;
    enrollmentUser = null;
    resetMfaPanels();
    loginForm.reset();
    setStatus('Двуфакторната защита е настроена. Влез отново с паролата и TOTP кода.', 'success');
  } catch (error) {
    setStatus(error.code === 'auth/operation-not-allowed'
      ? 'Firebase Identity Platform/TOTP не е активиран за проекта. Настрой го във Firebase Console и повтори.'
      : 'Неуспешно записване на TOTP кода. Провери часа и кода в приложението.', 'error');
  } finally {
    document.getElementById('adminEnrollCode').value = '';
    submitButton.disabled = false;
  }
});

document.getElementById('copyTotpSecret').addEventListener('click', async () => {
  if (!enrollmentSecret) return;
  try {
    await navigator.clipboard.writeText(enrollmentSecret.secretKey);
    setStatus('Ключът е копиран. Пази го в тайна и го добави в authenticator приложението.', 'success');
  } catch {
    setStatus('Копирането не е достъпно в този браузър. Избери и копирай ключа ръчно.', 'error');
  }
});

document.getElementById('cancelAdminMfaChallenge').addEventListener('click', async () => {
  resolver = null;
  totpHint = null;
  await signOut(auth);
  challengeForm.reset();
  loginForm.reset();
  resetMfaPanels();
  setStatus('Входът е отменен.');
});

document.getElementById('cancelAdminMfaEnrollment').addEventListener('click', async () => {
  enrollmentSecret = null;
  enrollmentUser = null;
  await signOut(auth);
  enrollmentForm.reset();
  loginForm.reset();
  resetMfaPanels();
  setStatus('Настройката на двуфакторната защита е отменена.');
});

window.adminSignOut = () => signOut(auth);

if (new URLSearchParams(window.location.search).get('admin') === '1') {
  const adminTabButton = document.querySelectorAll('.login-tab')[1];
  if (adminTabButton) window.switchLoginTab('adminTab', adminTabButton);
}
