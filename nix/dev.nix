{ mkShell, pkgs, ... }:
mkShell {
  buildInputs = with pkgs; [
    # --- Node ---
    pnpm
  ];

  shellHook = ''
    echo "🧪 pnpm!"
  '';
}
