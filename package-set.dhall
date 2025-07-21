[
  {
    name = "base",
    repo = "https://github.com/dfinity/motoko-base",
    version = "master",
    dependencies = [] : List Text
  },
  {
    name = "matchers",
    repo = "https://github.com/aviate-labs/motoko-matchers",
    version = "main",
    dependencies = [ "base" ]
  },
  {
    name = "sha2",
    repo = "https://github.com/aviate-labs/sha2.mo",
    version = "main",
    dependencies = [ "base" ]
  }
]

