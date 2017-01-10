import { Component, OnInit } from '@angular/core';
import { MenuService } from './add-menu.service';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Menu } from './menu.model';

@Component({
    selector: 'add-menu',
    templateUrl: 'add-menu.component.html',
    styles: [' em { color: red }'],
    providers: [MenuService],
})
export class AddMenuComponent implements OnInit {
    addMenuForm: FormGroup;
    menu: Menu[];
    addMenu: Menu = new Menu();

    constructor(private _menuService: MenuService, private _formBuilder: FormBuilder) {
        this.addMenuForm = this._formBuilder.group({
                'ten' : ['', Validators.required],
                'gia' : ['', Validators.required]
            })
    }

    ngOnInit() { 
        this.loadAllMenu();
    }

    loadAllMenu() {
        this._menuService.getAllMenu().subscribe(res=> {   
            this.menu = res;
        })
    }

    saveNewMenu(mForm: NgForm) {
        if(mForm.valid) {
            console.log(this.addMenu);
            // this._menuService.addMenu(this.addMenu).subscribe(res => {
            //     console.log(res);
            // })
        }
    }
}