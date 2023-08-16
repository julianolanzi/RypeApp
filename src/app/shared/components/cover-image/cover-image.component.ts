import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RequestImagensCover } from 'src/app/models/imgs/images-cover-request';
import { AuthSelector, idUser } from '../../state-management/selectors/auth.selector';
import { GlobalState } from '../../state-management/states/global.state';
import { UploadImageCoverRequestAction } from '../../state-management/actions/global-pages/upload-images-cover/loading-upload-cover-request.actions';
import { Router } from '@angular/router';
import { TeamInfoSelector } from '../../state-management/selectors/team.selector';

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss']
})
export class CoverImageComponent {
  public ConverArray = [
    {
      id: "cofd1",
      urlCover: './assets/covers/cofd1.png',
    },
    {
      id: "cofd2",
      urlCover: './assets/covers/cofd2.png',
    },
    {
      id: "cofd3",
      urlCover: './assets/covers/cofd3.png',
    },
    {
      id: "fr841",
      urlCover: './assets/covers/fr841.png',
    },
    {
      id: "fr842",
      urlCover: './assets/covers/fr842.png',
    },
    {
      id: "ft1",
      urlCover: './assets/covers/ft1.png',
    },
    {
      id: "ft2",
      urlCover: './assets/covers/ft2.png',
    },
    {
      id: "ft3",
      urlCover: './assets/covers/ft3.png',
    },
    {
      id: "ft4",
      urlCover: './assets/covers/ft4.png',
    },
    {
      id: "ft5",
      urlCover: './assets/covers/ft5.png',
    },
    {
      id: "ft6",
      urlCover: './assets/covers/ft6.png',
    },
    {
      id: "ft7",
      urlCover: './assets/covers/ft7.png',
    },

  ];
  ConverSelected: any;
  IsSelected: boolean = false;
  idUser!: string;
  idTeam!: string;

  private subscriptions: Subscription = new Subscription();
  ImagemSelected!: RequestImagensCover;

  constructor(private store: Store<GlobalState>, private router: Router) {

  }

  ngOnInit(): void {

  }

  LoadIdUser() {
    const subscription = this.store
      .pipe(select(AuthSelector))
      .subscribe((user) => {
        this.idUser = user.id;
      });

    this.subscriptions.add(subscription);
  }
  LoadIdTeam() {
    const subscription = this.store
      .pipe(select(TeamInfoSelector))
      .subscribe((team) => {
        this.idTeam = team._id;
      });
  }

  selectedCover(item: any) {
    this.BoderCover(item);
    this.enablebutton(item);
    this.ConverSelected = item;
  }

  enablebutton(item: any) {
    let idtag = document.getElementById(item.id);
    let btn = document.querySelector('.container-button');
    if (idtag?.classList.contains('selected')) {
      console.log('tem tag');
    
    } else {
      console.log('não tem tag');
     
     
    }

  }
  BoderCover(item: any) {
    let idtag = document.getElementById(item.id);
    idtag?.classList.toggle('selected');
    let btn = document.querySelector('.container-button');

    document.addEventListener("mouseup", function (event) {
      var obj = document.getElementById(item.id);
      if (!obj?.contains(event.target as HTMLElement)) {
        idtag?.classList.remove('selected');
        btn?.classList.remove('active');
      } else {

      }
    })
  }

  sendCover() {
    const local = this.router.url;

    if (local == "/upload-cover-user") {
      this.LoadIdUser();

      this.ImagemSelected = {
        url: this.ConverSelected.urlCover,
        type: "user",
        id: this.idUser,
      }
      this.store.dispatch(new UploadImageCoverRequestAction(this.ImagemSelected));

    } else {
      this.LoadIdTeam();
      this.ImagemSelected = {
        url: this.ConverSelected.urlCover,
        type: "team",
        id: this.idTeam,
      }
      this.store.dispatch(new UploadImageCoverRequestAction(this.ImagemSelected));

    }




  }
}
