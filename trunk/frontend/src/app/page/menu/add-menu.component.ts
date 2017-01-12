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
    editMenuForm: FormGroup;
    menu: Menu[];
    addMenu: Menu = new Menu();
    editMenu: Menu = new Menu();

    constructor(private _menuService: MenuService, private _formBuilder: FormBuilder) {
        this.addMenuForm = this._formBuilder.group({
                'ten' : ['', Validators.required],
                'hinh': [],
                'gia' : ['', Validators.required],
                'ghichu': []
            })
        this.editMenuForm = this._formBuilder.group({
                'ten' : ['', Validators.required],
                'hinh': [],
                'gia' : ['', Validators.required],
                'ghichu': []
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

    loadEditMenu(id: any) {
        this._menuService.getEditMenu(id).subscribe(res => {
            
            this.editMenu = res;
            console.log(this.editMenu);
        })
    }

    saveNewMenu(mForm: NgForm) {
        if(mForm.valid) {
            if(!this.addMenu.hinh) {
                this.addMenu.hinh = '';
            }

            this._menuService.addMenu(this.addMenu).subscribe(res => {
                if(res.serverStatus == 2) {
                    this.loadAllMenu();
                    this.clearForm();
                }
            })
        }
    }

    removeMenu(id: any) {
        this._menuService.removeMenu(id).subscribe(res => {
            if(res.status == 200) {
                this.loadAllMenu();
            } 
        })
    }

    clearForm() {
        this.addMenuForm.reset();
    }
}