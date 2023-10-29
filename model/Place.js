class Place {
  constructor(title, imgurl, address, location) {
    this.title = title;
    this.imgurl = imgurl;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
