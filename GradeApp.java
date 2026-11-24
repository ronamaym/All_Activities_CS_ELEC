import java.util.Scanner;

public class GradeApp {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("----------------------------------");
        System.out.println("Welcome To the GWA App Calculator");
        System.out.println("----------------------------------\n");
        
        // Guidance tip for inputting subject count
        System.out.println("Enter the number of subjects: ");
        int count = Integer.parseInt(input.nextLine());

        String[] names = new String[count];
        double[] units = new double[count];
        double[] grades = new double[count];
        double[] hours = new double[count];

        for (int i = 0; i < count; i++) {
            System.out.println("\n==============================");
            System.out.println("Subject " + (i + 1) + "\n");

            System.out.print("Subject " + (i + 1) + " name: ");
            names[i] = input.nextLine();

            System.out.print("Subject " + (i + 1) + " units: ");
            units[i] = Double.parseDouble(input.nextLine());

            System.out.print("Subject " + (i + 1) + " grade (1.00-5.00): ");
            grades[i] = Double.parseDouble(input.nextLine());

            System.out.print("Subject " + (i + 1) + " hours: ");
            hours[i] = Double.parseDouble(input.nextLine());

            System.out.println("==============================");
        }

        double totalUnits = 0;
        double totalPoints = 0;
        double totalHours = 0;
        boolean hasFailing = false;

        for (int i = 0; i < count; i++) {
            totalUnits += units[i];
            totalHours += hours[i];
            totalPoints += (grades[i] * units[i]);

            if (grades[i] > 3.0) {
                hasFailing = true;
            }
        }

        double gwa = Math.round((totalPoints / totalUnits) * 100.0) / 100.0;

        String standing = hasFailing ? "Has failing grade(s)" : (gwa <= 1.75 ? "Dean's Lister" : "Passed");

        System.out.println();
        System.out.println("========== GRADE REPORT ==========");
        System.out.println("Subject\t\tUnits\tGrade\tHours\tRemarks");

        for (int i = 0; i < count; i++) {
            String remarks = (grades[i] <= 3.0) ? "Passed" : "Failed";
            System.out.println(names[i] + "\t\t" + units[i] + "\t" + grades[i] + "\t" + hours[i] + "\t" + remarks);
        }

        System.out.println("----------------------------------");
        System.out.println("Total units:\t" + totalUnits);
        System.out.println("Total hours:\t" + totalHours);
        System.out.println("GWA:\t\t" + gwa);
        System.out.println("Standing:\t" + standing);
        System.out.println("----------------------------------");

        input.close();
    }
}