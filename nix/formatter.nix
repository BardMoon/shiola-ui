{ pkgs, inputs, ... }:
let
  treefmtModule = inputs.treefmt-nix.lib.evalModule pkgs {
    projectRootFile = "flake.nix"; # .git/config
    programs = {
      # Nix
      nixfmt.enable = true;
      statix.enable = true;
      deadnix.enable = true;

      # Util
      shfmt.enable = true;
      just.enable = true;
      taplo.enable = true;

      # Main
      prettier.enable = true;
      biome.enable = true;
    };
    settings = {
      global.excludes = [
        "**/*.lock"
        "**/pnpm-lock.yaml"
        "**/package-lock.json"
      ]; # https://github.com/numtide/treefmt-nix/issues/171
      prettier = {
        editorconfig = true;
        includes = [
          # "*.js"
          # "*.ts"
          "*.svelte"
          # "*.json"
          # "*.md"
          # "*.css"
        ];
        plugins = [
          # "prettier-plugin-svelte"
        ];
      };
      biome = {
        includes = [
          "*.js"
          "*.ts"
          "*.jsx"
          "*.tsx"
          "*.json"
        ];
      };
      rustfmt = {
        includes = [ "*.rs" ];
      };
      shfmt = {
        includes = [ "*.sh" ];
      };
    };
  };
in
treefmtModule.config.build
