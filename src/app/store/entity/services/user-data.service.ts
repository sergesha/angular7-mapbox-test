import { Injectable } from '@angular/core';
import { UserModel } from '@app/models/user.model';
import { FirestoreDataConfig, FirestoreDataService } from '@app/store/entity/services/firestore-data.service';

@Injectable()
@FirestoreDataConfig({
    collectionName: 'users'
})
export class UserDataService extends FirestoreDataService<UserModel> {
}
