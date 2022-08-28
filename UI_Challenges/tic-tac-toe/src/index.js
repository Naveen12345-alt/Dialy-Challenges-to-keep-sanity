import Alert from './app/alert';
import Controller from './app/controller';
import Store from './app/store';
import Views from './app/views';
import './styles.scss';

function loadApp() {
  const viewService = new Views();
  const storeService = new Store();
  const controllerService = new Controller();
  const alertService = new Alert(viewService, storeService, controllerService);

  viewService.constructGrid();

  viewService.setTurn(
    `Player ${controllerService.getControl() + 1} - ${controllerService.getOption(
      controllerService.getControl()
    )}`
  );

  viewService.initGridListener((cell) => {
    const cellValue = storeService.getItem(cell);
    if (!cellValue) {
      const currentPlayer = controllerService.getControl();
      const currentPlayerOption = controllerService.getOption(currentPlayer);

      storeService.setItem(cell, currentPlayer);
      viewService.setCellValue(cell, currentPlayerOption);

      const checkWinner = controllerService.checkWinner(storeService.getStore(), currentPlayer);
      if (checkWinner) {
        return alertService.alertAndReset(`Player ${currentPlayer + 1} wins!`);
      }

      if (storeService.getTurns() === 9) {
        alertAndReset(`It's a tie`);
        return;
      }

      storeService.incrementTurns();

      controllerService.switchControl();

      viewService.setTurn(
        `Player ${controllerService.getControl() + 1} - ${controllerService.getOption(
          controllerService.getControl()
        )}`
      );
    }
  });
}

loadApp();
