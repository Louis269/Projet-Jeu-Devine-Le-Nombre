import java.util.Scanner;
import java.util.Random;

public class DevineLeNombre {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        String rejouer;

        do {

            // 🎯 Choix de la difficulté
            System.out.println("Choisis un niveau de difficulté :");
            System.out.println("1 → Facile (1-50, 15 essais)");
            System.out.println("2 → Moyen (1-100, 10 essais)");
            System.out.println("3 → Difficile (1-200, 7 essais)");
            System.out.println("4 → Expert (1-50, 5 essais)");

            int choix = scanner.nextInt();

            int maxNombre = 100;
            int maxEssais = 10;

            switch (choix) {
                case 1:
                    maxNombre = 50;
                    maxEssais = 15;
                    break;
                case 2:
                    maxNombre = 100;
                    maxEssais = 10;
                    break;
                case 3:
                    maxNombre = 200;
                    maxEssais = 7;
                    break;
                case 4:
                    maxNombre = 50;
                    maxEssais = 5;
                    break;
                default:
                    System.out.println("Choix invalide, difficulté moyenne par défaut.");
            }

            int nombreSecret = random.nextInt(maxNombre) + 1;
            int tentative = 0;
            int essais = 0;
            boolean quitterPartie = false;

            System.out.println("=== Jeu : Devine le nombre ===");
            System.out.println("Devine un nombre entre 1 et " + maxNombre);
            System.out.println("Tu as " + maxEssais + " essais maximum.");
            System.out.println("Écris 'pause' à tout moment pour mettre le jeu en pause.");

            while (tentative != nombreSecret && essais < maxEssais && !quitterPartie) {

                System.out.print("Entre un nombre entre 1 et " + maxNombre + " ou 'pause' : ");
                String saisie = scanner.next();

                // 🎮 OPTION PAUSE
                if (saisie.equalsIgnoreCase("pause")) {
                    System.out.println("=== Jeu en pause ===");
                    System.out.println("1 → Reprendre");
                    System.out.println("2 → Quitter la partie");

                    int choixPause = scanner.nextInt();
                    while (choixPause != 1 && choixPause != 2) {
                        System.out.println("Tape 1 pour reprendre ou 2 pour quitter");
                        choixPause = scanner.nextInt();
                    }

                    if (choixPause == 2) {
                        quitterPartie = true;
                        System.out.println("Tu as quitté la partie !");
                        break;
                    }

                    System.out.println("Reprise du jeu !");
                    continue;
                }

                // Conversion en nombre
                try {
                    tentative = Integer.parseInt(saisie);
                } catch (NumberFormatException e) {
                    System.out.println("Erreur : tu dois entrer un nombre valide ou 'pause'");
                    continue;
                }

                // 🔹 Vérification des limites selon difficulté
                if (tentative < 1 || tentative > maxNombre) {
                    System.out.println("Erreur : le nombre doit être entre 1 et " + maxNombre + " !");
                    continue;
                }

                essais++;

                if (tentative < nombreSecret) {
                    System.out.println("C'est plus grand !");
                } else if (tentative > nombreSecret) {
                    System.out.println("C'est plus petit !");
                } else {
                    System.out.println("Bravo ! Tu as trouvé en " + essais + " essais !");
                }
            }

            // 👇 Condition Game Over
            if (!quitterPartie && essais == maxEssais && tentative != nombreSecret) {
                System.out.println("Game Over ! Le nombre était : " + nombreSecret);
            }

            // 🔁 Option rejouer
            System.out.print("Veux-tu rejouer ? (oui/non) : ");
            rejouer = scanner.next();

        } while (rejouer.equalsIgnoreCase("oui"));

        System.out.println("Merci d'avoir joué !");
        scanner.close();
    }
}