let upstream =
      https://github.com/dfinity/vessel-package-set/releases/download/2022_11_21/package-set.dhall
        sha256:01c9e1439d929550c00f90ac708e3cf43e519fcbd78a3bfa89b83a1c2f66c1d2

in {
  compiler = Some "0.8.1",
  dependencies = [
    "base",
    "ic-cdk",
    "array"
  ],
  package-set = upstream
}










