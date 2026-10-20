# ДорЛаб — laboratoire routier en ligne

Site web (RU / FR / EN) pour les laboratoires routiers du Kazakhstan : calcul des essais (enrobé, bitume, granulométrie, SMA), formulation granulométrique (19 types de mélanges), méthodes avec schémas, procès-verbal rédigeable en PDF, journal des essais et documents partagés par laboratoire.

Adresse : https://valsobdev.github.io/dorlabkz/

- Accès sur invitation : on crée son labo (chef) ou on le rejoint avec un code d'invitation.
- Rôles : laborantin, chef de labo (valide les protocoles), administrateur du site (lecture seule sur tous les labos).
- Base de données : Supabase (règles d'accès dans `supabase/schema.sql` et `supabase/admin.sql`, fournis dans l'archive du projet).

La clé `anon` de `config.js` est publique par conception ; la protection des données vient des règles d'accès de la base.
