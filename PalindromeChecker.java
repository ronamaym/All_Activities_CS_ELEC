public class PalindromeChecker {
    public static boolean isPalindrome(String input) {
        if (input == null) return false;
        String cleaned = input.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        int left = 0, right = cleaned.length() - 1;

        while (left < right) {
            if (cleaned.charAt(left++) != cleaned.charAt(right--)) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true
        System.out.println(isPalindrome("Java")); // false
    }
}