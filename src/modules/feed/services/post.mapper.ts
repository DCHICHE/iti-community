import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(data.message)
    }
  }

  private parseMessage(message: string): PostMessage {
    // TODO rajouter png jpg et gif
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|gif|png)/gmi;

     // TODO mp4,wmv,flv,avi,wav
    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;

     // TODO mp3,ogg,wav
    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    let pictureMatche = message.match(pictureRegex);
    if (pictureMatche) {
      pictureMatche = pictureMatche.filter( this.uniqueValues ) as RegExpMatchArray;
      pictureMatche.forEach(link => {
        // TODO ajouter un attachement de type image dans attachements
      const picture : MessageImageElement = {
        url : link,
        type : "image"
        };
        attachements.push(picture);
      });
    }

    let videoMatche = message.match(videoRegex);
    if (videoMatche) {
      videoMatche.filter( this.uniqueValues ) as RegExpMatchArray;
      videoMatche.forEach(link => {
        // TODO ajouter un attachement de type video dans attachements
        const video : MessageVideoElement = {
          url : link,
          type : "video"
        };
        attachements.push(video);
      });
    }

    let audioMatche = message.match(audioRegex);
    if (audioMatche) {
      audioMatche = audioMatche.filter( this.uniqueValues ) as RegExpMatchArray;
      audioMatche.forEach(link => {
        // TODO ajouter un attachement de type audio dans attachements
        const audio : MessageAudioElement = {
          url : link,
          type : "audio"
        };
        attachements.push(audio);
      });
    }

    let youtubeMatche = message.match(youtubeRegex);
    if (youtubeMatche) {
      youtubeMatche = youtubeMatche.filter( this.uniqueValues ) as RegExpMatchArray;
      console.debug(youtubeMatche)
      youtubeMatche.forEach(link => {
        youtubeRegex.lastIndex = 0;
        const t = youtubeRegex.exec(link) as RegExpExecArray;
        // TODO ajouter un attachement de type youtube dans attachements
        const ytb : MessageYoutubeElement = {
          type : "youtube",
          videoId : t[2]
        };
        attachements.push(ytb);
      });
    }

    let regex: RegExp = new RegExp(/(https|http)(:\/\/)(\w|\S)*/, 'gm');
    let results = message.match(regex);
    if (results) {
      console.debug(results);
      results = results.filter( this.uniqueValues ) as RegExpMatchArray;

      results.forEach(link => {
        message = message.split(link).join(`<a href='${link}'>${link}</a>`);
      });
    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }

  private uniqueValues (value: any, index: number, array: Array<any>) {
    return array.indexOf(value) === index;
  };
}
