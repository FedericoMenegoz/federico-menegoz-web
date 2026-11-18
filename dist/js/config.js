(() => {
  "use strict";

  // Profili e velocità della scrittura, condivisi senza dipendenze esterne.
  window.Portfolio = {
    profiles: {
      dev: {
        name: "Federico Menegoz",
        username: "federico.menegoz",
        title: "Full-Stack Developer | Java & Spring Boot",
        roles: ["Software Developer", "Full Stack Developer"],
        description: "Java and Spring Boot development, from SQL schemas and authentication to web interfaces."
      },
      music: {
        name: "Sweaty Effe",
        username: "sweaty.effe",
        title: "Producer / DJ ",
        roles: ["Producer", "DJ"],
        description: "Music producer and DJ as Sweaty Effe."
      }
    },
    timing: { type: 85, erase: 40, hold: 1800, gap: 180, profileGap: 500 }
  };
})();
