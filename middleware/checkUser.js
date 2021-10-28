export default async function({ $auth, redirect, route }) {
  await $auth.fetchUser().then(res => {
    console.log(route.path.toString().includes("admin"));
    if (route.path.toString().includes("student_portal")) {
    } else if (route.path.toString().includes("teacher_portal")) {
    } else if (route.path.toString().includes("parent_portal")) {
    } else if (route.path.toString().includes("admin")) {
      if (!res.data.user[0].isadmin) {
        redirect("/");
      }
    }
  });
}
