import React from "react";
import { JSONSchemaType } from "ajv";
import { nanoid } from "nanoid";
import { useDisclosure } from "@chakra-ui/react";

export type Instance<
  TOptions extends Record<string, any> = Record<string, any>
> = {
  options: TOptions;
  type: string;
  id: string;
};

type InteractionBuilder<TOptions> = {
  build(obj: Partial<Omit<Instance<TOptions>, "type">>): Instance<TOptions>;
  defaultInstance: Instance<TOptions>;
  schema: JSONSchemaType<TOptions>;
  RuntimeComponent: React.FC<{
    instance: Instance<TOptions>;
  }>;
  EditorComponent: React.FC<{ instance: Instance<TOptions> }>;
};

export default class ContentRegistry {
  public InteractionBuilders: Record<string, InteractionBuilder<any>> = {};
  from<T>(defaultOptions: T, schema: JSONSchemaType<T>) {
    return {
      addEmbed: (
        type: string,
        createInteractionBuilder: () => Omit<
          InteractionBuilder<T>,
          "schema" | "defaultInstance" | "build"
        >
      ) => {
        const defaultInstance = {
          id: nanoid(),
          options: defaultOptions,
          type,
        };
        const InteractionBuilder: InteractionBuilder<T> = {
          ...createInteractionBuilder(),
          schema,
          defaultInstance,
          build: function (instance) {
            return { ...defaultInstance, ...instance };
          },
        };
        // @ts-ignore
        this.InteractionBuilders[type] = InteractionBuilder;
        return InteractionBuilder;
      },
    };
  }
}
