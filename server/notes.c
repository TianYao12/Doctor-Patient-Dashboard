int last_digit(int number) {
  return number % 10;
}

int rest_digits(int number) {
  return number / 10;
}

int main(void) {
  printf("Should be 5: %d\n", last_digit(245));
  printf("Should be 24: %d\n", rest_digits(245));
}

int sum_to(int n) {
        if (n==0) 0;
        else {
            n + sum_to(n-1);
        }
}
