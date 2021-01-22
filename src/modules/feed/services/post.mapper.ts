import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(data.message)
    }
  }

  private parseMessage(message: string): PostMessage {
    debugger;
    // TODO rajouter png jpg et gif
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|gif|png)/gmi;

     // TODO mp4,wmv,flv,avi,wav
    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;

     // TODO mp3,ogg,wav
    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
     // TODO ajouter un attachement de type image dans attachements
      const picture : MessageImageElement ={
        url : pictureMatche[0],
        type : "image"
      }
      attachements.push(picture)

    }

    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
     // TODO ajouter un attachement de type video dans attachements
      const video : MessageVideoElement ={
        url : videoMatche[0],
        type : "video"
      }
      attachements.push(video)
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
     // TODO ajouter un attachement de type audio dans attachements
      const audio : MessageAudioElement ={
        url : audioMatche[0],
        type : "audio"
      }
      attachements.push(audio)
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
     // TODO ajouter un attachement de type youtube dans attachements
      const ytb : MessageYoutubeElement ={
        type : "youtube",
        videoId : youtubeMatche[2]
      }
      attachements.push(ytb)
    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}
