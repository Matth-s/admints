export const checkErrorAuth = (message: string) => {
  switch (message) {
    case 'auth/invalid-email':
      return 'Email invalide';
    case 'auth/missing-password':
      return 'Entrez un mot de passe';
    case 'auth/invalid-login-credentials':
      return 'Email ou mot de passe incorrect';
    default:
      return 'Erreur inattendue';
  }
};
