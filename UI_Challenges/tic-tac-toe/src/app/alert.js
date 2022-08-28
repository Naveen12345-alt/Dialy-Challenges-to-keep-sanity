export default class Alert {
  constructor(viewService, storeService, controllerService) {
    this.viewService = viewService;
    this.storeService = storeService;
    this.controllerService = controllerService;
  }

  alertAndReset(message) {
    this.viewService.alertWinner(message);
    setTimeout(() => {
      this.reset();
    }, 100);
  }

  reset() {
    this.viewService.resetGrid();
    this.storeService.initStore();
    this.viewService.setTurn(
      `Player ${this.controllerService.getControl() + 1} - ${this.controllerService.getOption(
        this.controllerService.getControl()
      )}`
    );
  }
}
