{
  description = "Development shell for uno-variations";
  # Daily Node/pnpm via Mise (mise.toml); this flake is the hermetic fallback.

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            pnpm
            git
          ];

          shellHook = ''
            echo "Entered nix develop shell for uno-variations"
            echo "Node: $(node --version)"
            echo "pnpm: $(pnpm --version)"
          '';
        };
      });
}
