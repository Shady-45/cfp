export const getFile = async function (filename) {
  try {
    const token = localStorage.getItem("user-details");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
