const infoAction = document.querySelector(".infoAction");
const infoGeneral = document.querySelector(".infoGeneral");
import { listePersonnages } from "./modules/listePersonnages.js";

export class Joueur {
  constructor({
    id,
    image,
    imageAffichage,
    nom,
    nomAffichage,
    pointsDeVie,
    atk,
    forceAffichage,
    nbPotions,
    potionsMax,
    potionAffichage,
    soin,
    btnAtk,
    btnSoin,
  }) {
    this.id = id;
    this.image = image;
    this.imageAffichage = imageAffichage;
    this.nom = nom;
    this.nomAffichage = nomAffichage;
    this.pointsDeVie = {
      pv: pointsDeVie.pv,
      pvMax: pointsDeVie.pvMax,
      pvAffichage: pointsDeVie.pvAffichage,
    };
    this.atk = atk;
    this.forceAffichage = forceAffichage;
    this.nbPotions = nbPotions;
    this.potionsMax = potionsMax;
    this.potionAffichage = potionAffichage;
    this.soin = soin;
    this.btnAtk = btnAtk;
    this.btnSoin = btnSoin;
  }

  setCaracteristiques({
    image,
    nom,
    pv,
    pvMax,
    atk,
    nbPotions,
    potionsMax,
    soin,
  }) {
    this.image = image;
    this.nom = nom;
    this.pointsDeVie.pv = pv;
    this.pointsDeVie.pvMax = pvMax;
    this.atk = atk;
    this.nbPotions = nbPotions;
    this.potionsMax = potionsMax;
    this.soin = soin;
  }

  afficherInfo() {
    this.imageAffichage.src = this.image;
    this.nomAffichage.textContent = this.nom;
    this.pointsDeVie.pvAffichage.textContent =
    this.pointsDeVie.pv + " / " + this.pointsDeVie.pvMax;
    this.forceAffichage.textContent = this.atk;
  }

  afficherPV(cible) {
    cible.pointsDeVie.pvAffichage.textContent =
      cible.pointsDeVie.pv + " / " + cible.pointsDeVie.pvMax;
    infoAction.textContent =
      this.nom +
      " attaque  / " +
      cible.nom +
      " qui perd " +
      this.atk +
      " points de vie !";
  }

  MAJAffichageMort(cible) {
    cible.pointsDeVie.pvAffichage.textContent =
      0 + " / " + cible.pointsDeVie.pvMax;
    infoGeneral.textContent =
      cible.nom + " est mort ! " + this.nom + " a gagné !";
    setTimeout(() => {
      if (confirm("souhaitez-vous recommencer la partie ?")) {
        this.reset(cible);
      }
    }, 200);
  }

  atker(cible) {
    cible.pointsDeVie.pv -= this.atk;
    if (cible.pointsDeVie.pv > 0) {
      this.afficherPV(cible);
    } else {
      this.MAJAffichageMort(cible);
    }
  }

  afficherPotions() {
    this.potionAffichage.textContent =
      this.nbPotions + " / " + this.potionsMax + "  (+" + this.soin + " pv)";
  }

  soigner() {
    if (this.nbPotions > 0) {
      infoAction.textContent =
        this.nom +
        " prend une potion et gagne jusqu'à " +
        this.soin +
        " points de vie !";

      if (this.pointsDeVie.pv + this.soin <= this.pointsDeVie.pvMax) {
        this.pointsDeVie.pv += this.soin;
      } else {
        this.pointsDeVie.pv = this.pointsDeVie.pvMax;
      }

      this.pointsDeVie.pvAffichage.textContent =
        this.pointsDeVie.pv + " / " + this.pointsDeVie.pvMax;
      this.nbPotions -= 1;
      this.afficherPotions();
    } else {
      infoAction.textContent = this.nom + " n'a plus de potion !";
    }
  }

  selectionPersonnage() {
    return prompt(this.id + " quel personnage souhaitez vous avoir ?");
  }

  start() {
    this.afficherPotions();
    this.afficherInfo();
  }

  resetBtn(cible) {
    this.btnAtk.classList.remove("disable");
    this.btnSoin.classList.remove("disable");
    cible.btnAtk.classList.add("disable");
    cible.btnSoin.classList.add("disable");
  }

  reset(cible) {
    infoGeneral.textContent = "";
    infoAction.textContent = "";
    this.resetBtn(cible);
    this.setCaracteristiques(listePersonnages[this.selectionPersonnage()]);
    cible.setCaracteristiques(listePersonnages[cible.selectionPersonnage()]);
    this.start();
    cible.start();
  }
}
