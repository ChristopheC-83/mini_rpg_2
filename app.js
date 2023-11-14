import { joueur1 } from "./modules/joueurs.js";
import { joueur2 } from "./modules/joueurs.js";

const reset = document.querySelector(".reset");

function choixJoueurs() {
  joueur1.reset(joueur2);
}
choixJoueurs();

joueur1.start();
joueur2.start();

function resetAction() {
  joueur1.reset(joueur2);
}

reset.addEventListener("click", () => {
  resetAction();
});

joueur1.btnAtk.addEventListener("click", () => {
  joueur1.atker(joueur2);
});
joueur1.btnSoin.addEventListener("click", () => {
  joueur1.soigner(joueur2);
});
joueur2.btnAtk.addEventListener("click", () => {
  joueur2.atker(joueur1);
});
joueur2.btnSoin.addEventListener("click", () => {
  joueur2.soigner(joueur1);
});


