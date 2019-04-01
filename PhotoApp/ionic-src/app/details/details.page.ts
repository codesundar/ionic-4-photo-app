import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  post: any = {};
  constructor(public route: ActivatedRoute, public sharer: SocialSharing) { 
    this.route.params.subscribe( data=> this.post = data);
  }

  ngOnInit() {
  }

  share(){
    this.sharer.share(this.post.title,null,null, this.post.path);
  }
}
