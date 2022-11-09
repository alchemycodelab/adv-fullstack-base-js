let
  pkgs = import <nixpkgs> {};
  overlay = (self: super: rec {
  });
in
with pkgs;
stdenv.mkDerivation {
  name = "node-project";
  buildInputs = [
    nodejs-18_x
    postgresql
  ];
  shellHook = ''
      export PATH="$PWD/node_modules/.bin/:$PATH"
      export PGDATA=$PWD/pg.conf
      alias scripts='jq ".scripts" package.json'
      function postgres-start {
        echo 'If this fails, you may need to kill postgres processes and run again.'
        pg_ctl -D .tmp/$USER -l logfile -o "--unix_socket_directories='$PWD'" start
      }
      function postgres-create {
        initdb .tmp/$USER
        createdb $USER
      }
  '';
}
