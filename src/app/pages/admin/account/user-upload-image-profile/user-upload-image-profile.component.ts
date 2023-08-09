import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ImageCroppedEvent, ImageTransform, Dimensions, base64ToFile, ImageCropperComponent } from 'ngx-image-cropper';
import { AccountSelector } from 'src/app/shared/state-management/selectors/account.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

import { UserUpdateImgRequest } from 'src/app/models/account/update-img/user-update-img-request';
import { UserSuccessResponse } from 'src/app/models/account/user-load-info/user-success-response';
import { AccountUpdateLoadImgRequestAction } from 'src/app/shared/state-management/actions/account/account-img/account-update-load-img-request.actions';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { isLoadingGlobal, url } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { AlertService } from 'src/app/services/utils/alert.service';


@Component({
  selector: 'app-user-upload-image-profile',
  templateUrl: './user-upload-image-profile.component.html',
  styleUrls: ['./user-upload-image-profile.component.scss']
})
export class UserUploadImageProfileComponent {
  private subscriptions: Subscription = new Subscription();
  updateImg!: UserUpdateImgRequest;
  public user!: UserSuccessResponse;
  file!: File;

  url: any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL!: string;
  imagemNome!: string;

  loading$!: Observable<boolean>;
  ImageProfile$!: Observable<string>;

  constructor(private store: Store<GlobalState>, private Alerts: AlertService) {

    this.ImageProfile$ = this.store.pipe(select(url));
  }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.loadUser();
    this.croppedImage = this.user.url;
  }

  public loadUser() {
    const subscription = this.store
      .pipe(select(AccountSelector))
      .subscribe((response) => {
        this.user = response;
        this.croppedImage = this.user.url;


      });
    this.subscriptions.add(subscription);
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.target.files[0].name;
    this.file = event.srcElement.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    // event.blob can be used to upload the cropped image
  }
  imageLoaded() {
    // show cropper
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Crepper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.Alerts.error('O tipo da imagem é Inválida', 'Ops alguma coisa nao deu certo');
  }

  uploadImageApi() {
    const testeImage = this.croppedImage.split(',')[1];
    const imageName = this.file.name;
    const imageBlob = this.dataURItoBlob(testeImage);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });


    this.updateImg = {
      id: this.user._id,
      file: imageFile,
    };

    this.croppedImage = imageFile;

    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new AccountUpdateLoadImgRequestAction(this.updateImg));

  }
  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

 

}
