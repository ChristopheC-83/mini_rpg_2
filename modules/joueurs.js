import { Joueur } from "./Joueur.js";

export let joueur1 = new Joueur({
  id: "joueur1",
  imageAffichage: document.querySelector("#imageJoueur1"),
  nomAffichage: document.querySelector("#nomJoueur1"),
  pointsDeVie: {
    pvAffichage: document.querySelector("#pvJoueur1"),
  },
  forceAffichage: document.querySelector("#forceJoueur1"),
  potionAffichage: document.querySelector("#potionsJoueur1"),
  btnAtk: document.querySelector("#atkJoueur1"),
  btnSoin: document.querySelector("#soinJoueur1"),
});

export let joueur2 = new Joueur({
  id: "joueur2",
  imageAffichage: document.querySelector("#imageJoueur2"),
  nomAffichage: document.querySelector("#nomJoueur2"),
  pointsDeVie: {
    pvAffichage: document.querySelector("#pvJoueur2"),
  },
  forceAffichage: document.querySelector("#forceJoueur2"),
  potionAffichage: document.querySelector("#potionsJoueur2"),
  btnAtk: document.querySelector("#atkJoueur2"),
  btnSoin: document.querySelector("#soinJoueur2"),
});