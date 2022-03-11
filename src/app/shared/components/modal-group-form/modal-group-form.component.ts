import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { GroupService } from '../../api/group.service';
import { getFullName, isArrayEquals, sortByAdmin } from '../../global-utils/functions';
import {
  Edit_Group_Model,
  groupOrSpace,
  GroupOrSpaceControls,
  GroupOrSpaceFormGroup,
  Group_Data_Modal,
  Group_Model,
  GROUP_TYPE,
  NameSearch,
  Response_Type
} from '../../models/models';
import { ModalService } from '../../services/modal.service';
import { ToastNotifService } from '../../services/toast-notif.service';
import { User_Model } from '../../store/user/user.model';

@Component({
  selector: 'modal-group-form',
  templateUrl: './modal-group-form.component.html',
  styleUrls: ['./modal-group-form.component.scss']
})
export class ModalGroupFormComponent implements OnInit {
  groupForm: GroupOrSpaceFormGroup;
  userList: NameSearch[] = [];
  userListOrigin: NameSearch[] = [];
  nameOrigin: string = '';
  slotsOrigin: number | null = null;
  peopleMaxOrigin: number | null = null;
  occupMaxOrigin: number | null = null;
  form$: Observable<any>;

  isGroup: boolean = true;
  TITLE: string = '';
  LABEL: string = '';
  LABEL_PLACEHOLDER: string = '';
  SEARCH_PLACEHOLDER: string = '';
  CREATE_LABEL: string = '';

  groupData: Group_Data_Modal;
  isRoute: boolean = false;
  isLoading = false;
  currentUser$: Observable<User_Model>;
  currentUser: User_Model | undefined;
  public nameSearch = (item: NameSearch) => item;
  isAdmin: boolean = false;
  isCreateMode: boolean = false;
  isFormDisabled: boolean = true;

  constructor(
    @Optional() public dialogRef: MatDialogRef<ModalGroupFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public groupDialogData: Group_Data_Modal,
    private _fb: FormBuilder,
    private _toastNotifService: ToastNotifService,
    private _groupService: GroupService,
    private _route: ActivatedRoute,
    private _router: Router,
    private store: Store<{ user: User_Model }>,
    private _modalService: ModalService
  ) {
    if (this._route.snapshot.data['groupData']) {
      this.isRoute = true;
      this.groupData = this._route.snapshot.data['groupData'];
    } else this.groupData = this.groupDialogData;

    if (this.groupData.data) this.isCreateMode = false;
    else this.isCreateMode = true;

    this.currentUser$ = store.select('user').pipe(
      tap((currentUser) => {
        this.currentUser = currentUser;
        if (!this.isCreateMode) {
          this.isAdmin = this.groupData.data.MEMBER_LIST.some((u) => u.ADMIN && u.UPN == this.currentUser?.UPN);
          if (!this.isAdmin && !this.isCreateMode) {
            this.toggleDisableForm();
          } else {
            this.toggleDisableForm(false);
          }
          return;
        }
        this.toggleDisableForm(false);
        const owner: NameSearch = {
          label: getFullName(currentUser),
          listlabel: '',
          value: currentUser.UPN,
          isAdmin: true
        };
        this.userList.push(owner);
        this.userListOrigin.push(owner);
      })
    );

    this.initLabelFormData();
    this.groupForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      slots: new FormControl(null),
      view: new FormControl(''), // to reuse autocomplete
      user: new FormControl(''),
      peopleMax: new FormControl(null),
      occupationMax: new FormControl(null)
    } as GroupOrSpaceControls) as GroupOrSpaceFormGroup;

    this.form$ = this.groupForm.valueChanges.pipe(
      filter((search: groupOrSpace) => !!search.user),
      tap((user) => this.addToUserList(user))
    );

    if (!this.isGroup) {
      this.groupForm.controls.slots.setValidators([Validators.required, Validators.min(1)]);
      this.groupForm.controls.peopleMax.setValidators([Validators.required, Validators.min(0)]);
      this.groupForm.controls.occupationMax.setValidators([Validators.required, Validators.min(0)]);
    }

    if (!this.isCreateMode) this.initGroupOrSpaceDataForm(this.groupData.data);
  }

  private toggleDisableForm(disable = true) {
    const action = disable ? 'disable' : 'enable';
    this.isFormDisabled = disable;
    this.groupForm.controls.name[action]();
    this.groupForm.controls.slots[action]();
    this.groupForm.controls.user[action]();
  }

  private initLabelFormData() {
    this.isGroup = this.groupData.type == GROUP_TYPE.Group;
    this.CREATE_LABEL = 'Créer';
    this.TITLE = this.isGroup ? 'Créer un Groupe/Equipe' : 'Créer un Espace/Zone';
    this.LABEL = this.isGroup ? 'Nom du Groupe/Equipe' : "Nom de l'Espace/Zone";
    this.LABEL_PLACEHOLDER = 'Ex: Digital Factory';
    this.SEARCH_PLACEHOLDER = 'Rechercher un collaborateur';
  }

  private initGroupOrSpaceDataForm(pData: Group_Model) {
    this.TITLE = (pData.ADMIN ? 'Modifier ' : 'Consulter ') + (this.isGroup ? 'un Groupe/Equipe' : 'un Espace/Zone');
    this.CREATE_LABEL = 'Sauvegarder';

    // console.log(this.groupData);
    this.groupForm.controls.name.setValue(pData.NAME);
    this.groupForm.controls.slots.setValue(pData.NBSEAT);
    this.groupForm.controls.peopleMax.setValue(pData.NBMAX);
    this.groupForm.controls.occupationMax.setValue(pData.PERCENTMAX);
    this.userList = pData.MEMBER_LIST.map((member) => ({ label: getFullName(member), listlabel: '', value: member.UPN, isAdmin: member.ADMIN }));

    this.nameOrigin = pData.NAME;
    this.slotsOrigin = pData.NBSEAT;
    this.peopleMaxOrigin = pData.NBMAX;
    this.occupMaxOrigin = pData.PERCENTMAX;
    this.userListOrigin = pData.MEMBER_LIST.map((member) => ({ label: getFullName(member), listlabel: '', value: member.UPN, isAdmin: member.ADMIN }));
  }

  ngOnInit(): void {}

  private addToUserList(pNewUser: groupOrSpace): void {
    if (!this.userList.some((res) => res.value == pNewUser.user.value)) {
      this.userList.unshift({ ...pNewUser.user, isAdmin: false });
    } else {
      this._toastNotifService.showWarning('Ce collaborateur a été dèjà ajouté');
    }
    this.groupForm.controls.user.setValue(null);
  }

  removeFromUserList(pIndex: number): void {
    // const ttt = this.userList;
    this.userList.splice(pIndex, 1);
    // this.userList = [];
    // setTimeout(() => {
    //   this.userList = ttt;
    // }, 10);
  }

  removeAdminPrivileges(index: number): void {
    this.userList[index].isAdmin = false;
    this.userList = sortByAdmin(this.userList);
  }

  addAdminPrivileges(index: number): void {
    this.userList[index].isAdmin = true;
    this.userList = sortByAdmin(this.userList);
  }

  trackByUser(index: number, user: NameSearch): any {
    return user.value;
  }

  private hasChanged(): boolean {
    return (
      !isArrayEquals(this.userListOrigin, this.userList) ||
      this.groupForm.controls.name.value !== this.nameOrigin ||
      this.slotsOrigin !== this.groupForm.controls.slots.value ||
      this.peopleMaxOrigin !== this.groupForm.controls.peopleMax.value ||
      this.occupMaxOrigin !== this.groupForm.controls.occupationMax.value
    );
  }

  private isUserListValid(): boolean {
    return this.userList.some((u) => u.isAdmin);
  }

  isFormInvalid() {
    return this.groupForm.invalid || !this.hasChanged() || !this.isUserListValid();
  }

  save(elm: HTMLDivElement) {
    if (this.groupForm.invalid || !this.hasChanged()) {
      this.groupForm.markAllAsTouched();
      return;
    }
    if (!this.isUserListValid()) {
      this._toastNotifService.showWarning(
        `Vous êtes actuellement le seul Administrateur de ${
          this.isGroup ? 'ce Groupe/Equipe' : 'cet Espace/zone'
        }. Veuillez nommer au moins un autre administrateur avant de quitter ${this.isGroup ? 'ce Groupe/Equipe' : 'cet Espace/zone'}.`
      );
      return;
    }
    if (this.isLoading) return;
    this.toggleLoding(elm, true);

    const vBody: Partial<Group_Model> = {
      TYP: this.groupData.type,
      NAME: this.groupForm.value.name,
      NBMAX: this.groupForm.value.peopleMax,
      MEMBER_LIST: this.userList.map((res) => ({ UPN: res.value, ADMIN: res.isAdmin })),
      NBSEAT: this.groupForm.value.slots,
      PERCENTMAX: this.groupForm.value.occupationMax || Number(this.groupForm.value.occupationMax)
    };
    // console.log(vBody);

    if (this.isCreateMode) this.createSpaceOrGroup(vBody, elm);
    else {
      const isNotMemberAnymore = !this.userList.some((u) => u.value == this.currentUser?.UPN);
      if (isNotMemberAnymore) {
        this.toggleLoding(elm, false);
        this._modalService
          .openRemoveFromGroupModal({ groupId: this.groupData.data.ID, isAdminDeleted: true, isGroup: this.isGroup })
          .afterClosed()
          .subscribe((isDeleted) => {
            if (isDeleted) {
              this.toggleLoding(elm, true);
              this.editSpaceOrGroup(vBody, elm, isNotMemberAnymore);
            } else if (isDeleted == false) this._toastNotifService.showError('error in API leave/removeMe from group');
          });
      } else this.editSpaceOrGroup(vBody, elm);
    }
  }

  createSpaceOrGroup(pBody: Partial<Group_Model>, elm: HTMLDivElement) {
    this._groupService.addSpaceOrGroup(pBody).subscribe((res) => {
      res.NAME = pBody.NAME || 'test';
      if (res.error) {
        if (res.error.indexOf('ERR_OST_DOUBLON_IN_BASE') > -1) {
          this._toastNotifService.showWarning(`Vous avez déjà créé un ${this.isGroup ? 'Groupe/Equipe' : 'Espace/Zone'} du même nom.`);
          this.toggleLoding(elm, false);
        } else this.handleApiProblem(elm);
      } else {
        this._toastNotifService.showSuccess(`${this.isGroup ? 'Le Groupe/Equipe' : "L'Espace/Zone"} a été ajouté`);
        this.close(res);
      }
    });
  }

  editSpaceOrGroup(pBody: Partial<Group_Model>, elm: HTMLDivElement, isNotMemberAnymore = false) {
    pBody.ID = this.groupData.data.ID;
    this._groupService.updateSpaceOrGroup(pBody).subscribe((res) => {
      if (res.error) {
        if (res.error.indexOf('ERR_OST_DOUBLON_IN_BASE') > -1) {
          this._toastNotifService.showWarning(`Vous avez déjà créé un ${this.isGroup ? 'Groupe/Equipe' : 'Espace/Zone'} du même nom.`);
          this.toggleLoding(elm, false);
        } else this.handleApiProblem(elm);
      } else {
        if (isNotMemberAnymore) {
          this.close(null, true);
          this._toastNotifService.showSuccess(`Vous avez quitté ${this.isGroup ? 'Le Groupe/Equipe' : "L'Espace/Zone"}`);
        } else {
          this._toastNotifService.showSuccess(`${this.isGroup ? 'Le Groupe/Equipe' : "L'Espace/Zone"} a été modifié`);
          this.close(res);
        }
      }
    });
  }

  private handleApiProblem(elm: HTMLDivElement) {
    this.isLoading = false;
    this.toggleLoding(elm, false);
    this._toastNotifService.showError("[API] Problème dans l'ajout");
  }
  private toggleLoding(elm: HTMLDivElement, state: boolean) {
    elm.classList[state ? 'add' : 'remove']('loading');
    this.isLoading = state;
  }

  deleteSpaceOrGroup() {
    this._modalService
      .openDeleteSpaceOrGroupModal(this.groupData.data, this.isGroup)
      .afterClosed()
      .subscribe((isDeleted) => {
        if (isDeleted) {
          this.close(null, true);
        }
      });
  }

  hasAdmin(): boolean {
    return this.userList.some((u) => u.isAdmin);
  }

  leaveGroupe() {
    this._modalService
      .openRemoveFromGroupModal({ groupId: this.groupData.data.ID, isAdminDeleted: false, isGroup: this.isGroup })
      .afterClosed()
      .subscribe((isDeleted) => {
        if (isDeleted) {
          this.close(null, true);
          this._toastNotifService.showSuccess('Vous avez quitté le Groupe/Equipe');
        } else if (isDeleted == false) this._toastNotifService.showError('error in API leave/removeMe from group');
      });
  }

  close(res?: Response_Type<Group_Model> | null, isDeleted = false) {
    if (this.isRoute) this._router.navigate([this.isGroup ? 'home/group-list' : 'home/space-list']);
    else this.dialogRef.close({ data: res, isDeleted } as Edit_Group_Model);
  }
}
