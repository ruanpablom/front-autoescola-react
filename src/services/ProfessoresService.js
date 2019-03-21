let failedLoadAttemps = 2;
let failedSaveAttemps = 2;
class ProfessoresService {
  static load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedLoadAttemps > 1) {
          const professores = window.localStorage.getItem("professores");
          resolve(professores ? JSON.parse(professores) : []);
        } else {
          failedLoadAttemps++;
          reject();
        }
      }, 3000);
    });
  }
  static save(professores) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (failedSaveAttemps > 1) {
          window.localStorage.setItem(
            "professores",
            JSON.stringify(professores)
          );
          resolve();
        } else {
          failedSaveAttemps++;
          reject();
        }
      }, 3000);
    });
  }
}

export default ProfessoresService;
