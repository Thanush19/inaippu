import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int m = sc.nextInt();
        int[] nums1 = new int[m];
        for (int i = 0; i < m; i++) {
            nums1[i] = sc.nextInt();
        }

        int n = sc.nextInt();
        int[] nums2 = new int[n];
        for (int i = 0; i < n; i++) {
            nums2[i] = sc.nextInt();
        }

        int i = m - 1;
        int j = n - 1;
        int k = m + n - 1;

        while (i >= 0 && j >= 0) {
            if (nums1[i] > nums2[j]) {
                nums1[k--] = nums1[i--];
            } else {
                nums1[k--] = nums2[j--];
            }
        }

        while (j >= 0) {
            nums1[k--] = nums2[j--];
        }

        for (int x = 0; x < nums1.length; x++) {
            System.out.print(nums1[x]);
            if (x < nums1.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println();

    }
}
