LE KADIOR — SITE VITRINE
==========================

Fichiers:
- index.html
- style.css
- script.js

IMPORTANT:
1. Ouvre index.html dans ton navigateur.
2. Numéro WhatsApp officiel : 221784666259 (WHATSAPP_NUMBER dans script.js
   et liens wa.me de index.html).
3. Les produits et prix se modifient directement dans le tableau products de script.js.

AJOUTER LES PHOTOS
------------------
Crée un dossier images/ à côté de index.html et dépose-y les photos avec ces noms.
Tant qu'une photo est absente, un visuel de remplacement élégant s'affiche.
Dès que le fichier existe, il remplace automatiquement ce visuel.

  images/hero.jpg           Accueil (portrait, ~1000 x 1250 px)
  images/pains.jpg          Catégorie Pains (portrait, ~900 x 1200 px)
  images/viennoiseries.jpg  Catégorie Viennoiseries
  images/patisserie.jpg     Catégorie Pâtisserie
  images/gateaux.jpg        Catégorie Gâteaux d'anniversaire
  images/apropos.jpg        Section À propos (portrait)
  images/galerie-1.jpg      Galerie : grande photo principale
  images/galerie-2.jpg      Galerie : format vertical
  images/galerie-3.jpg      Galerie : petit format
  images/galerie-4.jpg      Galerie : format vertical
  images/galerie-5.jpg      Galerie : format horizontal
  images/galerie-6.jpg      Galerie : format vertical
  images/galerie-7.jpg      Galerie : format horizontal
  images/galerie-8.jpg      Galerie : petit format
                            (photos recadrées automatiquement, ~1600 px de large conseillé)

Pour utiliser un autre nom de fichier, modifie simplement l'attribut
style="--img:url('images/xxx.jpg')" de l'emplacement concerné dans index.html.
Conseil : photos en .jpg, moins de 300 Ko chacune pour un chargement rapide.

PHOTOS DES PRODUITS
-------------------
Les dossiers sont déjà créés. Dépose chaque photo avec le nom exact ci-dessous
(format carré ou 4:3 conseillé, ~800 x 800 px, .jpg) :

  images/produits/pains/          baguette.jpg, pain-sicap.jpg, pain-double-sicap.jpg,
                                  pain-diabetique.jpg, pain-thiere.jpg,
                                  pain-mais.jpg, pain-riche.jpg, pain-sans-sel.jpg,
                                  pain-diabetique-sans-sel.jpg
  images/produits/viennoiseries/  croissant.jpg, pain-chocolat.jpg, brioche.jpg, pain-raisins.jpg
  images/produits/patisserie/     roche-coco.jpg, madeleine.jpg, biscuits.jpg, cookies.jpg,
                                  tarte.jpg, dessert.jpg
  images/produits/gateaux/        gateau-anniversaire.jpg, part-gateau.jpg,
                                  gateau-personnalise.jpg, gateau-evenementiel.jpg

Tant qu'une photo manque, la fiche affiche un visuel crème/marron avec le nom
du produit (jamais d'image cassée). Le chemin de chaque photo se trouve dans
la propriété image de chaque produit, dans script.js.
