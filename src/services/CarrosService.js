let failedLoadAttemps = 2;
let failedSaveAttemps = 2;
class CarrosService {
  static load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttemps > 1) {
          const carros = window.localStorage.getItem("carros");
          resolve(carros ? JSON.parse(carros) : []);
        } else {
          failedLoadAttemps++;
          reject();
        }
      }, 3000);
    });
  }
  static save(carros) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedSaveAttemps > 1) {
          window.localStorage.setItem("carros", JSON.stringify(carros));
          resolve();
        } else {
          failedSaveAttemps++;
          reject();
        }
      }, 3000);
    });
  }
}
export default CarrosService;
