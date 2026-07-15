import { AspectRatio, Card } from '@shared/ui';
import demoVideo from '@shared/assets/demo.mp4';

export function DemoVideo(): React.JSX.Element {
  return (
    <Card className="mt-10 overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        <video className="h-full w-full object-cover" controls preload="metadata">
          <source src={demoVideo} type="video/mp4" />
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
      </AspectRatio>
    </Card>
  );
}
