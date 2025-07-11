"use client";

import { EditorCommand, EditorCommandEmpty, EditorCommandItem, EditorContent, EditorRoot } from "novel";
import { useState } from "react";
import { JSONContent } from "@tiptap/core";
import { defaultExtensions } from "./extensions";
import { slashCommand, suggestionItems } from "./SlashCommand";
import { handleCommandNavigation } from "novel/extensions";


const TailwindEditor: React.FC = () => {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const extensions = [...defaultExtensions, slashCommand];

  return (
    <div className="h-screen">
    <EditorRoot>
      <EditorContent
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          }
      }}
      />
      <EditorCommand className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
        <EditorCommandEmpty className='px-2 text-muted-foreground'>No results</EditorCommandEmpty>
        {suggestionItems.map((item) => (
          <EditorCommandItem
            value={item.title}
            onCommand={(val) => {
              if (item.command) {
                item.command(val);
              }
            }}
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent`}
            key={item.title}
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
              {item.icon}
            </div>
            <div>
              <p className='font-medium'>{item.title}</p>
              <p className='text-xs text-muted-foreground'>{item.description}</p>
            </div>
          </EditorCommandItem>
        ))}
      </EditorCommand>
    </EditorRoot>
    </div>
  );
};

export default TailwindEditor;
