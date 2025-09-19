import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../Components/header.component/header.component';
import {SideBarComponent} from '../../Components/sidebar.component/sideBar.component';

@Component({
  selector: 'app-main.layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SideBarComponent
  ],
  template: `
    <div class="min-h-screen flex bg-gray-900 text-white">
      <!-- Background Gradient Blobs -->
      <div class="absolute pointer-events-none top-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
      <div class="absolute pointer-events-none top-0 right-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div class="absolute pointer-events-none bottom-20 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <!-- Sidebar -->
      <sidebar-component></sidebar-component>

      <!-- Main Content -->
      <main class="flex-1 p-4 pr-8 flex flex-col">
        <!-- Header -->
        <header-component></header-component>

        <!-- Page to load -->
        <router-outlet></router-outlet>
      </main>

    </div>
  `
})
export class MainLayout {

}
