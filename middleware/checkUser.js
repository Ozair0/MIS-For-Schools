export default async function({ $auth, redirect, route }) {
  await $auth.fetchUser().then(res => {
    console.log(res.data.user[0].isadmin);
    if (!res.data.user[0].isadmin) {
      redirect("/");
    }
  });
}
