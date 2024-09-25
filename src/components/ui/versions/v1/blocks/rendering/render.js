import Subtitle from "@/components/ui/versions/v1/blocks/Subtitle.js";
import Paragraph from "@/components/ui/versions/v1/blocks/Paragraph.js";
import Button from "@/components/ui/versions/v1/blocks/Button.js";
import Image from "@/components/ui/versions/v1/blocks/Image.js";
import Embed from "@/components/ui/versions/v1/blocks/Embed.js";
import Code from "@/components/ui/versions/v1/blocks/Code.js";
import Blink from "@/components/ui/versions/v1/blocks/Blink.js";
import Video from "@/components/ui/versions/v1/blocks/Video.js";
import Model from "@/components/ui/versions/v1/blocks/Model.js";

export function render(item, gateway) {
	if (item.type.includes("subtitle")) {
		return <Subtitle item={item} />;
	} else if (item.type.includes("paragraph")) {
		return <Paragraph item={item} />;
	} else if (item.type.startsWith("button")) {
		return <Button item={item} />;
	} else if (item.type.startsWith("image")) {
		return <Image gateway={gateway} item={item} />;
	} else if (item.type.startsWith("embed")) {
		return <Embed item={item} />;
	} else if (item.type.startsWith("code")) {
		return <Code item={item} />;
	} else if (item.type.startsWith("blink")) {
		return <Blink item={item} />;
	} else if (item.type.startsWith("video")) {
		return <Video gateway={gateway} item={item} />;
	} else if (item.type.startsWith("model")) {
		return <Model gateway={gateway} item={item} />;
	}
}
