import { Component, OnInit } from '@angular/core';

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

  ];
  ConverSelected: any;
  IsSelected: boolean = false;
  consteructor() {


  }

  OnInit() {
    console.log(this.ConverArray);
  }

  selectedCover(item: any) {
    this.BoderCover(item);
    
    // this.ConverSelected = item;
  }

  BoderCover(item: any) {
    console.log(item);
    let idtag = document.getElementById(item.id);
    console.log(idtag);
    idtag?.classList.toggle('selected');

    let btn = document.querySelector('.container-button');
    btn?.classList.toggle('active');

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
    console.log(this.ConverSelected);
  }
}
