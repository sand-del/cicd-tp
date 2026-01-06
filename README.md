# Hello World API

Une API REST simple pour générer des messages de salutation personnalisés, construite avec Node.js et Express.

## 🚀 Démarrage rapide

### Prérequis
- Node.js ≥ 14.x
- npm ≥ 6.x

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/votre-utilisateur/hello-world-api.git
cd hello-world-api

# Installer les dépendances
npm install

# Démarrer le serveur en développement
npm start

# Le serveur sera accessible sur http://localhost:3000
```

## 📖 Documentation

### Endpoints API

| Méthode | Endpoint          | Description                          | Exemple de réponse               |
|---------|-------------------|--------------------------------------|----------------------------------|
| GET     | `/hello`          | Message de salutation générique      | `Hello world!`                   |
| GET     | `/hello/:name`    | Message personnalisé avec paramètre  | `Hello world! From Alice`        |
| POST    | `/hello`          | Message personnalisé avec en-tête    | `Hello world! From Bob`          |

### Exemples d'utilisation

**GET sans paramètre**
```bash
curl http://localhost:3000/hello
# Réponse: Hello world!
```

**GET avec paramètre**
```bash
curl http://localhost:3000/hello/Alice
# Réponse: Hello world! From Alice
```

**POST avec en-tête**
```bash
curl -X POST -H "x-name: Bob" http://localhost:3000/hello
# Réponse: Hello world! From Bob
```

## 🧪 Tests

### Exécuter les tests
```bash
# Tous les tests
npm test

# Tests unitaires uniquement
npm test -- tests/unit/

# Tests d'intégration uniquement
npm test -- tests/integration/

# Tests end-to-end uniquement
npm test -- tests/e2e/
```

### Couverture des tests
- ✅ Tests unitaires pour la logique métier
- ✅ Tests d'intégration pour les endpoints
- ✅ Tests end-to-end pour le flux complet
- ✅ Validation des entrées et gestion des erreurs

## 🔧 Configuration

### Variables d'environnement
| Variable       | Description                     | Valeur par défaut |
|----------------|---------------------------------|-------------------|
| PORT           | Port du serveur                 | 3000              |
| NODE_ENV       | Environnement d'exécution       | development       |

### Exemple de configuration
```bash
# Démarrer sur un port différent
PORT=8080 npm start

# Mode production
NODE_ENV=production npm start
```

## 📦 Dépendances

### Principales
- **express**: Framework web pour Node.js
- **axios**: Client HTTP pour les tests E2E
- **supertest**: Bibliothèque de test HTTP

### Développement
- **jest**: Framework de test
- **eslint**: Linter pour JavaScript

## 🤝 Contribution

1. Forker le projet
2. Créer une branche de fonctionnalité
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. Commiter vos changements
   ```bash
   git commit -m "Ajoute une nouvelle fonctionnalité"
   ```
4. Pousser vers la branche
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📬 Contact

Pour toute question ou suggestion, veuillez ouvrir une issue sur GitHub.
