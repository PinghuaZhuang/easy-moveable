declare type Key = number | string;

type NonUndefined<A> = A extends undefined ? never : A;
