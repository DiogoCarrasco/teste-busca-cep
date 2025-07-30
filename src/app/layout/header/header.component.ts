import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  enderecosMenuOpen: boolean = false;

  toggleEnderecosMenu(): void {
    this.enderecosMenuOpen = !this.enderecosMenuOpen;
  }
}
