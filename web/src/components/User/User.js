
const User = async () => {
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()
  if (isAuthenticated) {
    console.log(currentUser);
  }
}