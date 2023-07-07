import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PostRequest } from 'src/app/models/feed/post';
import { FeedPostCreateRequestAction } from 'src/app/shared/state-management/actions/feed/feed-post/feed-create-post-request.actions';
import { AuthSelector } from 'src/app/shared/state-management/selectors/auth.selector';
import { GlobalState } from 'src/app/shared/state-management/states/global.state';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  postForm!: FormGroup;
  private subscriptions: Subscription = new Subscription();
  postRequest!: PostRequest;
  public user!: any;
  id!: string;

  isVideo: boolean = false;
  isImage: boolean = false;
  istext: boolean = false;

  isUrlImgValid: boolean = false;
  isUrlVideoValid: boolean = false;;

  disableImagem: boolean = true;
  disableVideo: boolean = true;

  enablePreview: boolean = true;
  enablePreviewVideo: boolean = true;

  url: string = '';
  urlVideo: string = '';

  apiLoaded = false;
  videoId = '';

  constructor(private store: Store<GlobalState>) {
    this.postForm = new FormGroup({
      title: new FormControl(''),
      text: new FormControl('', [Validators.required]),
      type: new FormControl(''),
      urlPost: new FormControl(''),
      urlVideo: new FormControl(''),
    })

  }


  get text() {
    return this.postForm.get('text');
  }


  ngOnInit(): void {
    this.loadUser();

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

  }
  public loadUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.user = user;
      });

    this.subscriptions.add(subscription);
  }

  clearAll() {

  }
  createPost() {
    if (this.postForm.invalid) {
      return;
    }

    this.postRequest = Object.assign({}, this.postRequest, this.postForm.value);

    if (this.postRequest.urlPost.length > 0) {
     
      this.postRequest = {
        ...this.postForm.value,
        type: 'imagem'
      }
    }
    if (this.postRequest.urlVideo.length > 0) {
      this.postRequest = {
        ...this.postForm.value,
        type: 'video',
        urlVideo: this.videoId,
      }
    } if(this.postRequest.urlVideo.length == 0 && this.postRequest.urlPost.length == 0){
      this.postRequest = {
        ...this.postForm.value,
        type: 'text'
      }
    }
   
   
    this.store.dispatch(new FeedPostCreateRequestAction(this.postRequest));

    this.postForm.get('text')?.reset('');
    this.postForm.get('urlPost')?.reset('');
    this.postForm.get('urlVideo')?.reset('');

    this.isVideo = false;
    this.isImage = false;
    this.istext = true;
  }

  isVideoYoutube() {
    this.isVideo = true;
    this.isImage = false;
    this.istext = false;

    this.disableVideo = false;
    this.enablePreviewVideo == true;
    this.isUrlVideoValid == false;

    this.postForm.get('urlPost')?.reset('');

  }
  isOnlyText() {
    this.isVideo = false;
    this.isImage = false;
    this.istext = true;
    this.postForm.get('urlPost')?.reset('');
    this.postForm.get('urlVideo')?.reset('');
  }

  isImageUrl() {
    this.isVideo = false;
    this.istext = false;

    this.isImage = true;
    this.disableImagem = false;
    this.isUrlImgValid = false;
    this.enablePreview = true;


    this.enablePreviewVideo = true;
    this.isUrlVideoValid = false;
    this.disableVideo = false;

    this.postForm.get('urlVideo')?.reset('');
  }
  onSelectImg(e: any) {
    let urlimg = e.target.value;

    var regex = new RegExp('^(https:\/\/|http:\/\/).+(jpeg|png|jpg|gif)');
    let valid = regex.test(urlimg);
    if (valid) {

      this.disableImagem = true;
      this.isUrlImgValid = false;
      this.enablePreview = false;

    }
    if (!valid) {
      this.disableImagem = false;
      this.isUrlImgValid = true;
      this.enablePreview = false;
    }
    if (urlimg.length == 0) {
      this.disableImagem = false;
      this.isUrlImgValid = false;
      this.enablePreview = true;
    }


    this.url = urlimg;
  }

  onSelectVideo(e: any) {
    let Urlinfo = e.target.value;
    let start = Urlinfo.indexOf('v=');



    if (start != -1) {
      let last = Urlinfo.indexOf('&');
      start = start + 2;
      let result = Urlinfo.substring(start, last);
      this.videoId = result;

      this.enablePreviewVideo = false;
      this.isUrlVideoValid = false;
      this.disableVideo = true;

    } if (Urlinfo.length == 0 || start == -1) {
      this.disableVideo = false;
      this.enablePreviewVideo = false;
      this.isUrlVideoValid = true;
    }



  }
}
