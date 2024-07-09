// const clientKey = "5945e97e8c16ceca3264eb122a390e65";
// const clinetSecret = "b8e94d335d1e634e6a746ade7722366ccba626a3";
export const formatDiseaseName = (diseaseName) => {
  // Split the string by spaces
  const words = diseaseName.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the words with underscores
  const formattedName = capitalizedWords.join("_");

  return formattedName;
};
// export const webScrap = async (diseaseName) => {
//   const accessToken =
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1OTQ1ZTk3ZThjMTZjZWNhMzI2NGViMTIyYTM5MGU2NSIsImp0aSI6IjUyYmIxNmU0ZmZhZWMxNzUxNTlkODViNzljMGIxYWZiMjVmNDI3MWM1NmE5NGUyMGFjODM5OTliMTBiODg0MWJkZGUzYzJkMDgyNGJhOWYzIiwiaWF0IjoxNzIwNDYyNTU1LjcwMTkwMSwibmJmIjoxNzIwNDYyNTU1LjcwMTkwNCwiZXhwIjozMzI3NzM3MTM1NS42OTg4MjYsInN1YiI6Ijc2MDMzMjczIiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyIsImNyZWF0ZWVkaXRtb3ZlcGFnZSIsImVkaXRwcm90ZWN0ZWQiXX0.rKNiT6V3zDVo1qHpTMA_M0mpDCAXPnYFe83fy6UpCilSaniz_spzUXQAp9VoeDQiaTRzHQxeeWy436UMN5FTTjq4e49lhQjTN2urkHumcmC087InrRmqxz1EZJu8cPMSrahBl5QygueUu2CTPLhHmkFKYkiVevZt96mZKQtAP_vN37n9O0WVf3IoX8jroq-ST4leGzE-arX-Tq_UagTwHw3Xf_8peEIiXHi7jo_cPwACJmgt9wr79bm0ZRHgOsQsk9RsjpgLCFUUEsctjpuVWW0YfYxj3_bHWMQMNk6AbiC5PYHIbXGILU9J5ZWetLAbUUMCyf1eSGEorO0KGdU-DPcJ7xrkame3SrkvIeu3jHledClAn3UYs1qQuIBIkW9nG9XLoUH13MyxSpMMinQutc8yr-n-q0Xger-VWIYFTLZhFFR96nnJqHz0lNbRIr83kJ5uK7QdlsnTDxUSCtIK_53fc5DRp04-8Ojyi0JpwbBqQjksV-GUjFaiq3EdjdOSdNPoGLbfj90AOZ2HdcR28gYDdGMohRjoskdyaoaMi6aKzR2gXCIEt8qTCKpN4xNH4Aga_wf9nmtAs7t7aKvvk-nzMTv4hbMeJpZGLRlaHFhvjwdrHesH3XNJm8IWzi20zvuc0F_8a_V534ahQVQpGl9AZ9r5VSnY-f32hNfrVtM";
//   const baseUrl = "https://en.wikipedia.org/wiki/";
//   const url = `${baseUrl}${formatDiseaseName(diseaseName)}`;
//   console.log("url from function" + url.replace(" ", "_"));
//   try {
//     let response = await fetch(url, {
//       headers: {
//         Authorization: accessToken,
//         "Api-User-Agent": "omnicare(o190679@rguktong.ac.in)",
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     console.log(response);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     return "Error occurred: " + error.message;
//   }
// };
