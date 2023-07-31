import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Observable, Subscription } from 'rxjs';
import { UserUpdateImgRequest } from 'src/app/models/account/update-img/user-update-img-request';
import { TeamDataSuccess } from 'src/app/models/teams/load-team/team-data-sucess';
import { AlertService } from 'src/app/services/utils/alert.service';
import { LoadingActiveAction } from 'src/app/shared/state-management/actions/global-pages/loading-load-active.actions';
import { TeamLoadUpdateRequestImg } from 'src/app/shared/state-management/actions/teams/team-img/team-load-update-img-request.actions';
import { isLoadingGlobal } from 'src/app/shared/state-management/selectors/global-pages.selector';
import { TeamDataSelector } from 'src/app/shared/state-management/selectors/team.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-update-img-team',
  templateUrl: './update-img-team.component.html',
  styleUrls: ['./update-img-team.component.scss']
})
export class UpdateImgTeamComponent {
  private subscriptions: Subscription = new Subscription();
  updateImg!: UserUpdateImgRequest;
  file!: File;
  url: any;

  public team!: TeamDataSuccess;


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


   }


   ngOnInit(): void {
    this.loading$ = this.store.pipe(select(isLoadingGlobal));
    this.loadTeam();
    this.croppedImage = this.team.url;
  }

   loadTeam(){
    const subscription = this.store
    .pipe(select(TeamDataSelector))
    .subscribe((team) => {
      this.croppedImage = team.url;
      this.team = team;
    });
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
      id: this.team._id,
      file: imageFile,
    };

    this.croppedImage = imageFile;

    this.store.dispatch(new LoadingActiveAction());
    this.store.dispatch(new TeamLoadUpdateRequestImg(this.updateImg));

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
