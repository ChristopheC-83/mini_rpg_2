const infoAction = document.querySelector(".infoAction");
const infoGeneral = document.querySelector(".infoGeneral");
import { listePersonnages } from "./listePersonnages.js";

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
      }else{
        alert("Bonne journée quand même !")
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
    this.toggleBTN(cible)
  }

  soigner(cible) {
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
    this.toggleBTN(cible)
  }

  toggleBTN(cible) {
    this.btnAtk.classList.toggle("disable");
    this.btnSoin.classList.toggle("disable");
    cible.btnAtk.classList.toggle("disable");
    cible.btnSoin.classList.toggle("disable");
    this.btnSoigner();
  }
  btnSoigner(){
    if (this.nbPotions === 0) {
      this.btnSoin.classList.add("disable");
    }
   
  }

  afficherPotions() {
    this.potionAffichage.textContent =
      this.nbPotions + " / " + this.potionsMax + "  (+" + this.soin + " pv)";
  }

  selectionPersonnage() {
    let choix = null;
    while (choix === null) {
        const reponse = prompt(this.id + " quel personnage souhaitez vous avoir ?\n1 - Shiba\n2 - Shenron\n3 - Torchy\n4 - Legend\n5 - Invisible Man");

        // Convertir la réponse en nombre
        choix = parseInt(reponse);

        // Vérifier si le choix est valide (entre 1 et 5)
        if (isNaN(choix) || choix < 1 || choix > 5) {
            alert("Veuillez choisir un nombre entre 1 et 5.");
            choix = null; // Réinitialiser le choix
        }
    }

    return choix;
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
    this.setCaracteristiques(listePersonnages[this.selectionPersonnage()-1]);
    cible.setCaracteristiques(listePersonnages[cible.selectionPersonnage()-1]);
    this.start();
    cible.start();
  }
}
