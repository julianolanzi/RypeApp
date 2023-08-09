import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { PostCreateImageRequest } from 'src/app/models/feed/create-post/post-create-request-image';
import { AlertService } from 'src/app/services/utils/alert.service';
import { FeedPostCreateImageRequestAction } from 'src/app/shared/state-management/actions/feed/feed-post/feed-create-post-request-image.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-image-post',
  templateUrl: './image-post.component.html',
  styleUrls: ['./image-post.component.scss']
})
export class ImagePostComponent {
  postFormImage!: FormGroup;
  postRequestImage!: PostCreateImageRequest;
  public user!: any;
  counterText: number = 0;
  private subscriptions: Subscription = new Subscription();
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

  fileName!: File;

  constructor(private store: Store<GlobalState>, private Alerts: AlertService) {
    this.postFormImage = new FormGroup({
      text: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required])
    })

    this.postFormImage.get('text')?.valueChanges.pipe().subscribe((newvalue) => {
      this.counterText = newvalue.length;
    })
  }

  get file() {
    return this.postFormImage.get('file');
  }
  ngOnInit(): void {
    this.loadUser()
  }

  createPostImage() {
    if (this.postFormImage.invalid) {
      return;
    }

    const testeImage = this.croppedImage.split(',')[1];
    const imageName = this.fileName.name;
    const imageBlob = this.dataURItoBlob(testeImage);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });

    this.postRequestImage = Object.assign({}, this.postRequestImage, this.postFormImage.value);
    this.postRequestImage = {
      ...this.postFormImage.value,
      text: this.postFormImage.value.text,
      type: 'imagem',
      file: imageFile
    }

    this.store.dispatch(new FeedPostCreateImageRequestAction(this.postRequestImage));

    this.postFormImage.reset();
    this.croppedImage = '';
    this.imagemNome = '';
    this.showCropper = false;
    this.counterText = 0;
  }
  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });
    this.subscriptions.add(subscription);
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.target.files[0].name;
    this.fileName = event.srcElement.files[0];
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
}
