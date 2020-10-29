import { Component, Input, Inject, OnInit } from '@angular/core';
import { Profile } from '../../../data/profile.model';
import { Account } from '../../../data/account.model';
import { GenericEditingService } from '../../../services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../../account/account-editing.token';
import { pathToFileURL } from 'url';

@Component({
  selector: 'uic-profile',
  templateUrl: './profile.component.html',
})
/**
 * Class representing a user's profile information
 */
export class ProfileComponent implements OnInit {
  @Input() profiles!: Profile[];

  editMode = false;
  titleEdit = 'Click To Edit Your Profile';

  /**
   * Represents the _Profile Component_ 'constructor' method
   * @param editingService AccountEditingService
   */
  constructor(
    @Inject(ACCOUNT_EDITING_SERVICE)
    private readonly editingService: GenericEditingService<Partial<Account>>
  ) {}

  // For now, each profile will be given a hard-coded profile picture.
  // This is just so that we can stop hardcoding images into html and have it so images are being pulled from the profile object itself.
  // TODO! Later iteration need to add the functionality to allow a user to upload images.

  ngOnInit(): void {
    for (const profile of this.profiles) {
      profile.pfpUrl = 'https://cdn.iconscout.com/icon/free/png-256/avatar-366-456318.png';
    }
  }

  /**
   * Updates the _Editing Service_ with the new profile information
   */
  edited(): void {
    this.editingService.update({ profiles: this.profiles });
  }
}
